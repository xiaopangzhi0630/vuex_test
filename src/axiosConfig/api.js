let baseUrl; 
if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'http://10.9.0.74:9391/';
    baseUrl = 'http://192.168.20.20:9391/';
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = 'http://10.9.0.74:9391/';
}
 
export default baseUrl