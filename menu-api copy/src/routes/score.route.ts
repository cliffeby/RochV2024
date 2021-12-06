import { Router } from 'express';
import {
  createScore,
  deleteScore,
  getAllScores,
  getMatchScores,
  getScore,
  updateScore,
} from '../controllers/score.controller';
import { checkJwt } from '../middleware/authz.middleware';
import { checkPermissions } from '../middleware/permissions.middleware';
import { ItemPermission } from '../items/item-permission';

const scoreRoute = () => {
  const router = Router();
  router.use(checkJwt);
  console.log(
    'Permissions',
    ItemPermission.ReadScores,
    ItemPermission.UpdateScore
  );

  router.post('/', checkPermissions(ItemPermission.CreateScore), createScore);

  router.get(
    '/scoresByMatch/:id',
    checkPermissions(ItemPermission.ReadScores),
    
    getMatchScores
  );

  router.get('/:id', checkPermissions(ItemPermission.ReadScores), getScore);

  router.get('/', checkPermissions(ItemPermission.ReadScores), getAllScores);
  router.put('/:id', checkPermissions(ItemPermission.UpdateScore), updateScore);

  router.delete(
    '/:id',
    checkPermissions(ItemPermission.DeleteScore),
    deleteScore
  );

  return router;
};

export { scoreRoute };
