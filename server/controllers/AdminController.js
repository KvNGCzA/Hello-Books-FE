import helpers from '../helpers';
import models from '../database/models';

const {
  responseMessage, findUser
} = helpers;
const { User } = models;
const { ADMIN_ROLE, PATRON_ROLE } = process.env;

/**
 * Admin controller class
 * @class
 */
class AdminController {
  /**
   * change User Status
   * @name changeUserStatus
   * @param {object} request
   * @param {object} response
   * @returns {json} json
   * @memberof AdminController
   */
  static async changeUserStatus(request, response) {
    const { id } = request.params;
    const { status } = request.body;
    try {
      const message = await AdminController.checkErrors(request, response);
      if (message !== null) return responseMessage(response, message[0], { message: message[1] });
      await User.update({ status }, { where: { id } });
      return responseMessage(response, 200, {
        status: 'success', message: `user successfully ${status === 'active' ? 'activated' : 'deactivated'}`
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * Create a new user
   * @name checkErrors
   * @param {object} request
   * @param {object} response
   * @returns {json} json
   * @memberof AdminController
   */
  static async checkErrors(request, response) {
    const { id } = request.params;
    const { roleId } = request.userData.UserRoles[0];
    const { status } = request.body;
    const user = await findUser(id, response);
    const { dataValues, UserRoles } = user;
    if (parseInt(id, 10) === request.userData.id) {
      return [409, 'user cannot perform this action'];
    }
    if (roleId === parseInt(ADMIN_ROLE, 10)
    && UserRoles[0].roleId !== parseInt(PATRON_ROLE, 10)) {
      return [400, 'An admin can only activate/deactivate a patron'];
    }
    if (status === dataValues.status) {
      return [409, `user is already ${status}`];
    }
    return null;
  }
}
export default AdminController;
