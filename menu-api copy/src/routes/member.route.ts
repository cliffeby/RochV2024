import { Router } from 'express';
import { createMember, deleteMember, getAllMembers, getMember, updateMember } from '../controllers/member.controller';
import { checkJwt } from '../middleware/authz.middleware';
import { checkPermissions } from '../middleware/permissions.middleware';
import { ItemPermission } from '../items/item-permission';

const memberRoute = () => {
  const router = Router();
  router.use(checkJwt);
  router.post('/members',checkPermissions(ItemPermission.CreateMember), createMember);

  router.get('/members', checkPermissions(ItemPermission.ReadMembers), getAllMembers);

  router.get('/members/:id', checkPermissions(ItemPermission.ReadMembers), getMember);

  router.put('/members/:id', checkPermissions(ItemPermission.UpdateMember), updateMember);

  router.delete('/members/:id', checkPermissions(ItemPermission.DeleteMember), deleteMember);

  return router;
};

export { memberRoute };


// Create endpoint handlers for /members
// router.route('/members')
//   .post(jwtCheck,  jwtAuthz(['create:member'], options), memberController.postMember)
//   .get(jwtCheck, jwtAuthz(['read:members'], options), memberController.getMembers)
//   ;

// // Create endpoint handlers for /members/_id
// router.route('/members/:id')
//   .get(jwtCheck, jwtAuthz(['read:members'], options), memberController.getMember)
//   .put(jwtCheck, jwtAuthz(['create:member'], options), memberController.putMember)
//   .delete(jwtCheck, jwtAuthz(['remove:member'], options), memberController.deleteMember);

