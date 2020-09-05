import React from 'react';
import { TokenService, SetUser } from '../services/storage.service';

const accessToken = TokenService.getToken()

console.log(accessToken);

const headers = {
    headers: { 'Accept' : 'application/json',
               'Authorization' : 'Bearer ' +accessToken,
             }
  };


export default headers;