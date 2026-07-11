// RSA-2048 public key used to encrypt messages submitted through the
// confidential contact channel. Safe to be public — it can only encrypt,
// never decrypt. The matching private key was generated alongside this
// one and handed directly to the firm; it is not stored anywhere in this
// codebase or repository.
export const CONFIDENTIAL_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyRFO9J4mYAs8BcAQ+xdH
qEPZ/ayn7JCnUSisHBb40p2YS5Mep+aMAf8hzfDLmRZ1wHrd8Qxw5M+pe9dUOWVS
NWt8fo91S/4brHVyT+EJgiU/FkZWbEEhG7sjVpciAo3LOMtztqs5udNbQRcQ2/mY
5Li9OYbTMFHImncIA/NNg4xZRQQeyOP/iogbZdEWLtXkenvMeLWsPmEGHdmv+llT
EpX1km3I3f4dzaFUIgV8tkeOj5AtdWSeRWjte5qbRdQ4fELGRLdlci8c3H3cxFhh
u8i9VRFnxGwrl0kFmbXWYPK6aDOYVQlTX6wQ+IQ5aG20Jo6KzvFpTOvH9XXM7TDo
MwIDAQAB
-----END PUBLIC KEY-----`;
