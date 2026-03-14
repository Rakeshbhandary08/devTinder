# All the DevTinder API:

 >AuthRouter
-POST /signup
-POST /login
-POST /logout

 >ProfileRouter
-GET /Profile
-PATCH /profile/edit
-PATCH /profile/password

>ConnectionRequestRouter
-POST /request/send/interest/:userId
-POST /request/send/ignored/:userId

 >(request/review/status/requestId)
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

>UserRouter
-GET /user/requests
-GET /user/connections

-GET /feed => gets us the profiles of other users on platform

>Status: Ignore(pass),Interested(like),accepted,rejected


