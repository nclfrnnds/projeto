module.exports = (sequelize, DataTypes) => {
    const PermissaoUsuario = sequelize.define(
        "PermissaoUsuario", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkUsuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fkPermissao: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "permissoesUsuarios",
        }
    );

    PermissaoUsuario.associate = (models) => {
        PermissaoUsuario.belongsTo(models.Usuario, {
            foreignKey: "fkUsuario",
        });
        PermissaoUsuario.belongsTo(models.Permissao, {
            foreignKey: "fkPermissao",
        });
    };

    return PermissaoUsuario;
};
