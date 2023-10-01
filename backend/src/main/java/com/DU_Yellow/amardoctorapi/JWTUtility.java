package com.DU_Yellow.amardoctorapi;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTUtility {
    public Claims decodeJWTToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(Constant.API_SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
            return claims;
        } catch (Exception e) {
            // Handle token validation errors here
            return null;
        }
    }

    public Integer getId(String token){
        Claims claims = decodeJWTToken(token);
        if (claims != null) {
            // Access claims as needed
            //            String userEmail = (String) claims.get("email");
//            String userRole = (String) claims.get("role");
            return claims.get("Id", Integer.class);
        } else {
            // Handle invalid or expired token
            System.out.println("Invalid or expired token");
        }
        return null;


    }
}
