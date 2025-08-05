import { SignJWT, importPKCS8 } from 'jose'

const YourPrivateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEILwZQlkOXZ1B7VBDovbJx7PkuFBIu1EpOUwD/V6o5QZc
-----END PRIVATE KEY-----
`

export const getToken = () => {
  return new Promise((resolve) => {
    importPKCS8(YourPrivateKey, 'EdDSA')
      .then((privateKey) => {
        const customHeader = {
          alg: 'EdDSA',
          kid: 'T5B8TUHA7C',
        }
        const iat = Math.floor(Date.now() / 1000) - 30
        const exp = iat + 900
        const customPayload = {
          sub: '282GDJ4QWR',
          iat: iat,
          exp: exp,
        }
        new SignJWT(customPayload)
          .setProtectedHeader(customHeader)
          .sign(privateKey)
          .then((token) => {
            console.log('JWT: ' + token)
            return resolve(token)
          })
      })
      .catch((error) => console.error(error))
  })
}
