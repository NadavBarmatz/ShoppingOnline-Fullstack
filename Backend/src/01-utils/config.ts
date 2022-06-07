
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

class ProductionConfig extends Config {
    public mongoConnectionString = "";
    public constructor() {
        super();
        this.loginExpiresIn = "12h";
    }
}

const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;    
