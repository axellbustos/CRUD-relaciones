module.exports = (sequelize, DataTypes)=>{
    const alias='Genre';
    const cols={
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
            unique:true
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        ranking:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            unique:true
        },
        active:{
            type:DataTypes.TEXT('tiny'),
            allowNull:false,
            defaultValue: 1
        }
        }
    
    const config={
        tableName:'genres',
        timestamps: true,
        underscored: true
    }
    const Genre= sequelize.define(alias,cols,config)

    Genre.associate= (models)=>{
        Genre.hasMany(models.Movie,{
            as: 'movie',
            foreingKey: 'genre_id'
        })
    }

    return Genre
}