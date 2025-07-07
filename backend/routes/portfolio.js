const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient() // same as from kudosboard, DELETE these comments after merged and working in backend folder
