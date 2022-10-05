module.exports = (sequelize, DataTypes)=>{
    const alias='Movie';
    const cols={
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
            unique:true
        },
        title:{
            type: DataTypes.STRING(500),
            allowNull:false
        },
        rating:{
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull:false,
            unique:true
        },
        awards:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            defaultValue: 0,
            unique:true
        },
        release_date:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        length:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:true,
            defaultValue: null,
            unique:true
        },
        genre_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:true,
            defaultValue: null
        }
    }
    const config={
        tableName:'movies',
        timestamps: true,
        underscored: true
    }
    const Movie= sequelize.define(alias,cols,config)
    
    Movie.associate= (models)=>{
        Movie.belongsTo(models.Genre,{
            as: 'genre',
            foreingKey: 'genre_id'
        });
        Movie.belongsToMany(models.Actor,{
            as: 'actor',
            through:'actor_movie',
            foreingKey: 'movie_id',
            otherKey: 'actor_id'
        })
    }
    return Movie
}