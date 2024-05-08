



export const EnvConfiguration = () => ({
    "environment": process.env.NODE_ENV || 'dev',
    "MONGODB_URL": process.env.MONGODB_URL,
    "port": process.env.PORT || 3002,
    "DEFAULT_LIMIT": process.env.DEFAULT_LIMIT || 7
  });




