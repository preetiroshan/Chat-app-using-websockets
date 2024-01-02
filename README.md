# Chat-app-using-websockets

This is a basic chat app build using socket.io.
1. Messages sent by a user are shared to all members in the chat room.
2. Onine users will be updated when
- a new user joins
- someone is typing a message
- a user leaves the chat
3. Messages are tagged to the unique id of the sender.

Setup to run on local:
1. Clone the repo
2. `cd server`
3. run `yarn dev` - to start the server in watch mode. This command also serves the static FE stored in the `public` directory.