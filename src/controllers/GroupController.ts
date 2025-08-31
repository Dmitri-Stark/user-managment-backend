import { Request, Response, NextFunction } from 'express';
import { GroupRepository } from '../repositories/GroupRepository';
import { paginationSchema, removeUserFromGroupSchema } from '../helpers/validation';

export class GroupController {
  private groupRepository: GroupRepository;

  constructor() {
    this.groupRepository = new GroupRepository();
  }

  getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = paginationSchema.validate(req.query);
      if (error) throw error;

      const { limit, offset } = value;
      const result = await this.groupRepository.getAllGroups(limit, offset);
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  removeUserFromGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = removeUserFromGroupSchema.validate(req.body);
      if (error) throw error;

      await this.groupRepository.removeUserFromGroup(value.userId, value.groupId);
      
      res.json({ message: 'User removed from group successfully' });
    } catch (error) {
      next(error);
    }
  };
}