import React from 'react';
import { TokenService, SetUser } from '../services/storage.service';

const accessToken = TokenService.getToken()


const headers = {
    headers: { 'Accept' : 'application/json',
               'Authorization' : 'Bearer ' +accessToken,
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
             }
  };


export default headers;