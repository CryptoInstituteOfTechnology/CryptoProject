const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient() 

// need symbol, quantity, buy or sell, , pricee ,userid