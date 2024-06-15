import db from "@repo/db/client";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers : [
        CredentialsProvider({
           name : "Phone Number",
           credentials : {
                phone : {label : "Phone Number", type : "text", placeholder : "1234567"},
                password : {label : "Password", type : "password", placeholder : "Enter Password"},
           },
           async authorize(credentails : any) {
             
              const hashedPassword = await bcrypt.hash(credentails.password, 10);
              const existingUser = await db.user.findFirst({
                    where : {
                        number : credentails.phone,
                    }
              });

              if(existingUser) {

                  const passwordValidation = await bcrypt.compare(credentails.password, existingUser.password);

                  if(passwordValidation) {

                    return {
                        id : existingUser.id.toString(),
                        name : existingUser.name,
                        email : existingUser.number
                    }
                  }
                  else return null;
                  
              }

              try {

                    const user = await db.user.create({
                        data : {
                            number : credentails.phone,
                            password : hashedPassword,
                        }
                    })

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
              } catch(e) {
                   
                   console.log(e);

              }

              return null;
           }
        })
    ], 
    secret : process.env.JWT_SECRET || "secret",
    callbacks : {

        async session({token, session} : any) {
            session.user.id = token.sub
            return session;
        }
    }
}
