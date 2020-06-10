module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define(
        "Genero", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            descricao: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "generos",
            //freezeTableName: true,
        }
    );

    Genero.associate = (models) => {
        Genero.belongsToMany(models.Historia, {
            foreignKey: "fkGenero",
            through: models.GenerosHistoria,
        });
    };

    return Genero;
};
