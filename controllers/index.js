import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';
import {comparePasswords, hashPassword} from "../utils/index.js";
import User from "../models/user.js";

export async function createUser(req, res){
    const {
        name,
        lastName,
        birthDate,
        gender,
        cellPhone,
        email,
        password,
    } = req.body;

    if (!name || !lastName || !birthDate
        || !gender || !cellPhone || !email
        || !password) return res.status(400).json({});

    let user;
    try{
        user = await UserModel.findOne({email});
    }catch (e){
        return res.status(500).json({
            'msg': `Can not query user data!`
        })
    }

    if (user){
        return res.status(404).json({
            'msg': `Email ${email} already in use`,
        })
    }

    try{
        const passwordHash = await hashPassword(password);
        const newUser = await UserModel.create({
            name,
            lastName,
            birthDate,
            gender,
            cellPhone,
            email,
            passwordHash
        })

        return res.status(200).json({
            'msg':`Create user`,
            'data': newUser,
        })
    }catch (e){
        return res.status(500).json({
            'msg': 'Error creating user',
            'error': JSON.stringify(e),
        })
    }
}

export async function loginUser(req, res){
    const {
        email,
        password,
    } = req.body;

    if (!email || !password) return res.status(400).json({});

    let user;
    try{
        user = await UserModel.findOne({email});
    }catch (e) {
        return res.status(404).json({
            'msg': `Can not find the user with email: ${email}`
        })
    };

    if (!user){
        return res.status(404).json({
            'msg': `Can not find the user with email: ${email}`
        });
    }

    let comparation;
    try{
        comparation = await comparePasswords(password, user.passwordHash);

        if (!comparation){
            return res.status(400).json({
                'msg': `Invalid password`,
            })
        }
    }catch (e){
        return res.status(500).json({
            'msg': `Can not match passwords!`,
        })
    }

    if (comparation){
        const token = jwt.sign({
            id:user._id,
        },
            'SECRET',
            {
                expiresIn: 86400,
            }
        )

        return res.status(200).json({
            'msg': 'Authenticated',
            'token': token,
        })
    }else{
        return res.status(500).json({
            'msg': `Invalid password!`,
        })
    }
}