"use client"

import React, { useState } from 'react'


const Mpesa = () => {

    const [amount, setAmount] = useState("")
    const [phone, setPhone] = useState("")

    const mpesaFun = () => {
        if (amount) {//// put type of total price not interger not accept 
          try {
            if (phone == null || phone == undefined || phone == "") { 
            }
            else if (phone[0] == "0") {
              const tenje = phone.slice(1)
              const calltoken = tokenFunc(tenje, amount,)
            }
            else if (phone[0] == "+" && phone[1] == "2" && phone[2] == "5" && phone[3] == "4") {
              const tenje = phone.slice(4)
              const calltoken = tokenFunc(tenje, amount, )
            }
            else if (phone[0] == "2" && phone[1] == "5" && phone[2] == "4") {
              const tenje = phone.slice(3)
              const calltoken = tokenFunc(tenje, amount,)
            }
            else {
              const calltoken = tokenFunc(phone, amount, )
            }
          } catch {
            console.log('ngori')
          }
        } else {
          console.log('ngori')
        }
      }
    
      const tokenFunc = async (tenje, totalPrice, ) => {
        try {
          const secret = "U4ydYYmFdVyGhafILvs9VZgyrOE3rJGAzvx3eFsUpvwbcKGnQs54EdoJLUrh3mbq";
          const consumer = "ysboK2lt2dNvph5fAAUGGLf33cddnz4GtbO583oH4lLiAKQW";
          const auth = btoa(`${consumer}:${secret}`);
    
          const authResponse = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            method: "GET",
            headers: {
              Authorization: `Basic ${auth}`,
            },
          });
    
          const authData = await authResponse.json();
          const tokenvar = authData.access_token;
    
          const shortCode = 7931114;
          const phone = tenje;
          const amount = totalPrice;
          const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
          const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
          const date = new Date();
          const timestamp = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}${("0" + date.getHours()).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${("0" + date.getSeconds()).slice(-2)}`;
          const password = btoa(shortCode + passkey + timestamp);
    
          const data = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: `CustomerPayBillOnline`,
            Amount: amount,
            PartyA: `254${phone}`,
            PartyB: shortCode,
            PhoneNumber: `254${phone}`,
            CallBackURL: "https://mydomain.com/path",
            AccountReference: shortCode,
            TransactionDesc: "Testing stk push",
          };
    
          console.log(tokenvar);
    
          const response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenvar}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          const responseData = await response.json();
          console.log(JSON.stringify(responseData), 'callback');
    
        }
        catch (error) {
          console.error(error);
        }
      };
    
    



    return (

        <div>
            <p>
                Mpesa page
            </p>
        </div>
    )
}

export default Mpesa 