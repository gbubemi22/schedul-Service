import Joi from 'joi';


  const DriverSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    number: Joi.string().required(),
    password: Joi.string().required()
  })

  export default DriverSchema