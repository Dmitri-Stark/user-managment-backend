import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { paginationSchema, updateUsersStatusesSchema } from '../helpers/validation';

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = paginationSchema.validate(req.query);
      if (error) throw error;

      const { limit, offset } = value;
      const result = await this.userRepository.getAllUsers(limit, offset);
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  updateUsersStatuses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = updateUsersStatusesSchema.validate(req.body);
      if (error) throw error;

      await this.userRepository.updateUsersStatuses(value.updates);
      
      res.json({ message: 'Users statuses updated successfully' });
    } catch (error) {
      next(error);
    }
  };
}