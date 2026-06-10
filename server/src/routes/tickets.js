import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runQuery, getRow, getAllRows } from '../db/database.js';

const router = express.Router();

// Generate unique ticket ID
const generateTicketId = () => {
  return 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// POST /api/tickets - Create a new ticket
router.post('/', async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    // Validation
    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({ 
        error: 'Missing required fields: customer_name, customer_email, subject, description' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const ticket_id = generateTicketId();
    const created_at = new Date().toISOString();

    await runQuery(
      `INSERT INTO tickets (ticket_id, customer_name, customer_email, subject, description, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [ticket_id, customer_name, customer_email, subject, description, created_at, created_at]
    );

    res.status(201).json({
      ticket_id,
      created_at,
      message: 'Ticket created successfully'
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// GET /api/tickets - List all tickets with optional search and filter
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT ticket_id, customer_name, customer_email, subject, status, created_at FROM tickets WHERE 1=1';
    const params = [];

    // Filter by status
    if (status) {
      if (!['Open', 'In Progress', 'Closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      query += ' AND status = ?';
      params.push(status);
    }

    // Search across multiple fields
    if (search) {
      query += ` AND (customer_name LIKE ? OR ticket_id LIKE ? OR customer_email LIKE ? OR subject LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';

    const tickets = await getAllRows(query, params);
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// GET /api/tickets/:ticket_id - Get a specific ticket with notes
router.get('/:ticket_id', async (req, res) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await getRow(
      'SELECT * FROM tickets WHERE ticket_id = ?',
      [ticket_id]
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Get associated notes
    const notes = await getAllRows(
      'SELECT id, note_text, created_at FROM notes WHERE ticket_id = ? ORDER BY created_at DESC',
      [ticket_id]
    );

    res.json({
      ...ticket,
      notes
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// PUT /api/tickets/:ticket_id - Update ticket status and add notes
router.put('/:ticket_id', async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status, notes } = req.body;

    // Validate status if provided
    if (status && !['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Check if ticket exists
    const ticket = await getRow('SELECT * FROM tickets WHERE ticket_id = ?', [ticket_id]);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const updated_at = new Date().toISOString();

    // Update ticket status if provided
    if (status) {
      await runQuery(
        'UPDATE tickets SET status = ?, updated_at = ? WHERE ticket_id = ?',
        [status, updated_at, ticket_id]
      );
    }

    // Add note if provided
    if (notes && notes.trim()) {
      await runQuery(
        'INSERT INTO notes (ticket_id, note_text, created_at) VALUES (?, ?, ?)',
        [ticket_id, notes, new Date().toISOString()]
      );
    }

    res.json({
      success: true,
      updated_at
    });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// DELETE /api/tickets/:ticket_id - Delete a ticket (bonus feature)
router.delete('/:ticket_id', async (req, res) => {
  try {
    const { ticket_id } = req.params;

    const result = await runQuery('DELETE FROM tickets WHERE ticket_id = ?', [ticket_id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

export default router;
