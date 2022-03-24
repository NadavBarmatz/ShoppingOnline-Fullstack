
abstract class Config {
    public port: number = 3001;
    public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
    public mongoConnectionString = "mongodb://localhost:27017/StoreOnlineDB";
    public constructor() {
        super();
        this.loginExpiresIn = "24h";
    }
}

const config = new DevelopmentConfig();

export default config;    
