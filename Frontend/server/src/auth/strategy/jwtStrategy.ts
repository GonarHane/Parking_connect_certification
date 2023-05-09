import { ExtractJwt, Strategy } from 'passport-jwt'; /* importation des classes a partir de la bibio passport-jwt */ 
import { PassportStrategy } from '@nestjs/passport';/* importation des classes a partir de la bibio @nest/js/passport */
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {  /* La classe "JwtStrategy" est déclarée et étendue de "PassportStrategy (Strategy)" afin d'utiliser la stratégie d'authentification JWT dans l'application. */
  constructor() {
    super({   /* les options sont configurées pour extraire les informations JWT du jeton porteur envoyé avec chaque requête, */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), /* depuis le header sous forme de bearertoken */
      ignoreExpiration: false,    /* prendre en compte l'expiration */
      secretOrKey: 'secretKey',   /* utiliser la clé secrète "secretKey" pour déchiffrer les informations JWT */
    });
  }

  //verified callback
  async validate(payload: any) {   /* appel de la methode 'validate' apres une authentification réussie et recoit les infos décodé du jeton jwt */
    return {  id: payload.id, email: payload.email, role: payload.role };/* Cette méthode retourne un objet avec les propriétés "id", "email" et "role" extraites du payload JWT. */
  }
}
