import Utils from "../../utils";
import BLManager from "./manger";
import { apiSuccessMessage, httpConstants } from '../../common/constants'
import HTTPHandler from "../../utils/HTTPHandler";

export default class Index {
  async RegisterUser(request, response) {
    new lhtWebLog('RegisterUser', request.body, 'addContent', 0, '')
    const [error, UserRes] = await Utils.parseResponse(new BLManager().RegisterUsr(request.body))
    if (!UserRes) return Utils.handleError(error, request, response)
    return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async LoginUser(request, response) {
  new lhtWebLog('LoginUser', request.body, 'addContent', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().LoginUsr(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async GetUser(request, response) {
  new lhtWebLog('GetUser', request.body, 'Userdetails', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().GetUsr(request))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async UpdateUser(request, response) {
  new lhtWebLog('UpdateUser', request.body, 'Userupdate', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().UpdateUsr(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async CreatePost(request, response) {
  new lhtWebLog('UpdateUser', request.body, 'Userupdate', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().CreateUserPost(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async GetPost(request, response) {
  new lhtWebLog('GetUserPost', request.body, 'getpost', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().GetPostbyuser(request))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async UpdatePost(request, response) {
  new lhtWebLog('UpdatePost', request.body, 'Updatepost', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().UpdatepostbyUser(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async LikedPost(request, response) {
  new lhtWebLog('LikedPost', request.body, 'Likedpost', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().LikePostByuser(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async commentPost(request, response) {
  new lhtWebLog('commentPost', request.body, 'comment', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().PostComment(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async DeletePost(request, response) {
  new lhtWebLog('deletePost', request.body, 'remove', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().deletePost(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async SharePost(request, response) {
  new lhtWebLog('deletePost', request.body, 'remove', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().sharepost(request.body))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
async SearchPost(request, response) {
  new lhtWebLog('searchKey', request.body, 'remove', 0, '')
  const [error, UserRes] = await Utils.parseResponse(new BLManager().searchpost(request))
  if (!UserRes) return Utils.handleError(error, request, response)
  return Utils.response(response, UserRes, apiSuccessMessage.ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
}
}
