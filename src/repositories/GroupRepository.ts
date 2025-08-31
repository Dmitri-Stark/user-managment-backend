import { pool } from '../config/database';
import { Group, PaginatedGroups } from '../models/Group';
import { RowDataPacket } from 'mysql2';

export class GroupRepository {
  async getAllGroups(limit: number, offset: number): Promise<PaginatedGroups> {
    const connection = await pool.getConnection();
    
    try {
      const [groups] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM `groups` LIMIT ? OFFSET ?',
        [limit, offset]
      );
      
      const [countResult] = await connection.query<RowDataPacket[]>(
        'SELECT COUNT(*) as total FROM `groups`'
      );
      
      const total = countResult[0].total;
      const page = Math.floor(offset / limit) + 1;
      
      return {
        groups: groups as Group[],
        total,
        page,
        limit
      };
    } finally {
      connection.release();
    }
  }

  async removeUserFromGroup(userId: number, groupId: number): Promise<void> {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      await connection.execute(
        'DELETE FROM user_groups WHERE user_id = ? AND group_id = ?',
        [userId, groupId]
      );
      
      const [remainingUsers] = await connection.execute<RowDataPacket[]>(
        'SELECT COUNT(*) as count FROM user_groups WHERE group_id = ?',
        [groupId]
      );
      
      const status = remainingUsers[0].count > 0 ? 'notEmpty' : 'empty';
      
      await connection.execute(
        'UPDATE `groups` SET status = ? WHERE id = ?',
        [status, groupId]
      );
      
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}