import admin from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyAwHe1Ci22MD09r-skn7OZLyYBdEX35L74",
  client_email: "shiphitmobileapppickup-4d0a1@appspot.gserviceaccount.com",
  client_id: "101240979585321301073",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9ALl9D1+VNv7n\nSSra+U/ct067HrpAD8J5fUeutLjJDbWpapI4bL5uoGaU5SAkBP+9T54fJlxUcW6b\nIG/sCAN2owiZ31vpojvT2fbqC4DfHxpqXBsKXAXR1apE5rEUR0Ra1MhMRBYfsOeM\nvyriuzvn385ZZ9vt/2TZFzGs7iupB2fvidw7HtrpFWSHsNowEN8ih34wTawRtng2\nwwxKcbYSWuL6CuA/iaNGeX4LYeSImHD5D0xU1QAuq3XMo3UvD5KrQMdab4kU9N62\nbfP790hF4M2ACBAI4uxL2mICWp35TGCAtw23K6PLvUvHRMf/Vq3OWjd9qOzNp/7v\n45JlP4DjAgMBAAECggEAXVAwxC5lZhG/eyhUKMWDaPj1vYvXr844GWxBil9+hgEn\nSgwsQgBqasr1qpiPLEltjCV1b3KsjiJs1dkHeRShxR6MHhA5XFm1SQypi/b++unr\nzExKK2ywkN95T8hH8DeZZ3D7rS/GboIUaBhwD34afwov4lNVMaVwwH/jjjoOw0Xj\nbnabmuj8z7kN7o1LnM4IkE5TzbA4QfjLZgTm5y/yAgFeTvIxQ1M75JtTkWxZth7E\n8DO/TSqevW3M9JnNQssAOke42XuQG5EhCvwjM05SSHFkvZH36LMZcaPacJ2LkB+K\nJoeELSihwBsbQzrUlaESeHe4QVz+w+wAX0PkFYNyPQKBgQDLhegxKltyu7w/md2K\nPanAOt2k9alUNXxfm6KCDrqn1LfH+givcJQlyDDFULlrHbQ1CFsgkujSYYTYUNTN\nTiWg7e+fSakHEYbgE5cFUkAA2dtuk0S7tE4SauT9lq3aGOFtGzMv116RRbbOqDHn\n2DrEVGgTzeA62JuR+xGxfP86lwKBgQDtvF6UP18PIajV0ETWlgvq9wFjb+2afQr9\nbR8Jjt2tAiYbhhAnR0lUlxsUpqxjvD7QBM9wadATpPZVf5VHs4eERNLj4SiaMOWx\nOb+4rEJpiSm0XYNizcZ0DiIGwJvYHyp4jncurz5Z4PIRvS785pw+2VNj4wLhwuWp\nwLzq0lCxlQKBgHabbiqg5bRihh2GnN5Ae1nktGC7Ldg+Z2IMgFNNJChExmnLZB5h\n/GRcW1fSaIxtPiUd3oWIOBjK7jFmQe332eQEZf4tXk0ZQMH7iKp4OYaFb+Tr/EVr\nmYgQNa03j8+nalA8ZsM9vwXoW9XpnVPg5rad/h10gHWq4Fbdu3z1PIS3AoGAIcS4\n9nvN59tTHRPZQ1XK2ZQ+WT6D1IbgccD3QKdPa4y7lvtC/iFNFDvmd9d48y3BClE0\nmfYdvTyYVOqrbKTeofYYso+/8a7yYWsfhX7KbC00hE8oI3exMbj0MltXh6pdoQQz\nf6kaxS+Dkut5aijjlrXN94k+Vo0VjDg5XW2EUsUCgYEAowaN5UN3PQdmCKPOZ9hE\nlldt6VSwJasR7IQGI6Sre+yQOyavr13MJjm/qyNtI7BTWi37Zq3RDVmLRVvv8MSG\nagc6yMY85T5ljhyAgWQAbA3EnHwJGvoztqXFw0Mgb9zXylGG1z0cMBXN2vAEjbuB\nknLkR1ftwNJX76ClIbVZ4zY=\n-----END PRIVATE KEY-----\n",
  authDomain: "shiphitmobileapppickup-4d0a1.firebaseapp.com",
  projectId: "shiphitmobileapppickup-4d0a1",
  storageBucket: "shiphitmobileapppickup-4d0a1.appspot.com",
  messagingSenderId: "977746945332",
  appId: "1:977746945332:web:17c4aa3b217b35cf58f161",
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

// Export services for reuse
export const db = admin.firestore();
