import { Joi, celebrate } from "celebrate";
import { urlPattern } from "../constans/patterns";

export const getUserByIdValidation = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .alphanum()
        .length(24)
        .required(),
    }),
});

export const createUserValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(200),
      avatar: Joi.string()
        .pattern(urlPattern),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    }),
});

export const patchAboutUserValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(200),
    }),
});

export const patchAvatarUserValidation = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .pattern(urlPattern),
    }),
});

export const loginValidation = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    }),
});

export const createCardValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      link: Joi.string()
        .pattern(urlPattern)
        .required(),
    }),
});

export const cardValidation = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .alphanum()
        .length(24)
        .required(),
    }),
});
