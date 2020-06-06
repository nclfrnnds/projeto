module.exports = (sequelize, DataTypes) => {
    const Autor = sequelize.define(
        "Autor", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkHistoria: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fkUsuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            principal: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
        }
    );

    Autor.associate = (models) => {

    };

    return Autor;
};
