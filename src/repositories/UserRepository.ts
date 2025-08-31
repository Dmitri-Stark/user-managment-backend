import { pool } from '../config/database';
import { User, PaginatedUsers } from '../models/User';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class UserRepository {
  async getAllUsers(limit: number, offset: number): Promise<PaginatedUsers> {
    const connection = await pool.getConnection();
    
    try {
      const [users] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM users LIMIT ${parseInt(limit.toString())} OFFSET ${parseInt(offset.toString())}`
      );
      
      const [countResult] = await connection.query<RowDataPacket[]>(
        'SELECT COUNT(*) as total FROM users'
      );
      
      const total = countResult[0].total;
      const page = Math.floor(offset / limit) + 1;
      
      return {
        users: users as User[],
        total,
        page,
        limit
      };
    } finally {
      connection.release();
    }
  }

  async updateUsersStatuses(updates: { id: number; status: string }[]): Promise<void> {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      for (const update of updates) {
        await connection.execute(
          'UPDATE users SET status = ? WHERE id = ?',
          [update.status, update.id]
        );
      }
      
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}