module.exports = (sequelize, DataTypes)=>{
    const alias='Actor';
    const cols={
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
            unique:true
        },
        first_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        last_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        rating:{
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            default:null
        },
        favorite_movie_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            unique:true,
            default:null
        }
    }
    const config={
        tableName:'actors',
        timestamps: true,
        underscored: true
    }
    const Actor= sequelize.define(alias,cols,config)
    Actor.associate= (models)=>{
        
        Actor.belongsToMany(models.Movie,{
            as: 'movie',
            through:'actor_movie',
            foreingKey: 'actor_id',
            otherKey: 'movie_id'
        })
    }
    return Actor
}