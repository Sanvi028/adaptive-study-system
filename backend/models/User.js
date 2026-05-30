const moongose = require("moongose");

const UserSchema = new moongose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },

            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
            },

         password: {
      type: String,
      required: true,
    },
},
{
    timestamps: true
}
);

module.exports = moongose.model("User",UserSchema);