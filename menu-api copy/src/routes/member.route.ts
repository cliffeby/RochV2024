import { Router } from 'express';
import { createMember, deleteMember, getAllMembers, getMember, updateMember } from '../controllers/member.controller';
import { checkJwt } from '../middleware/authz.middleware';
import { checkPermissions } from '../middleware/permissions.middleware';
import { ItemPermission } from '../items/item-permission';

const memberRoute = () => {
  const router = Router();
  router.use(checkJwt);
  console.log('Permissions', (ItemPermission.ReadMembers), (ItemPermission.UpdateMember));

  // router.post(
  //   '/members',
  //   checkPermissions(ItemPermission.CreateMember),
  //   createMember
  // );

  // router.get(
  //   '/members',
  //   checkPermissions(ItemPermission.ReadMembers),
  //   getAllMembers
  // );

  // router.get(
  //   '/members/:id',
  //   checkPermissions(ItemPermission.ReadMembers),
  //   getMember
  // );

  // router.put(
  //   '/members/:id',
  //   checkPermissions(ItemPermission.UpdateMember),
  //   updateMember
  // );

  // router.delete(
  //   '/members/:id',
  //   checkPermissions(ItemPermission.DeleteMember),
  //   deleteMember
  // );
    router.post(
      '/',
      checkPermissions(ItemPermission.CreateMember),
      createMember
    );

    router.get(
      '/',
      checkPermissions(ItemPermission.ReadMembers),
      getAllMembers
    );

    router.get(
      '/:id',
      checkPermissions(ItemPermission.ReadMembers),
      getMember
    );

    router.put(
      '/:id',
      checkPermissions(ItemPermission.UpdateMember),
      updateMember
    );

    router.delete(
      '/:id',
      checkPermissions(ItemPermission.DeleteMember),
      deleteMember
    );

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
// app.get('/api/messages/public-message', (req, res) => {
//   res.send({
//     message:
//       "The API doesn't require an access token to share this message!!!.",
//   });
// });

// app.get('/api/messages/protected-message', checkJwt, (req, res) => {
//   res.send({
//     message: 'The API successfully validated your access token.',
//   });
// });

