module.exports = (sequelize, DataTypes) => {
    const Permissao = sequelize.define(
        "Permissao", {
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
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "permissoes",
            //freezeTableName: true,
        }
    );

    Permissao.associate = (models) => {
        Permissao.hasMany(models.PermissaoUsuario, {
            foreignKey: "fkPermissao",
        });
        Permissao.belongsToMany(models.Usuario, {
            foreignKey: "fkPermissao",
            sourceKey: "id",
            targetKey: "id",
            through: models.PermissaoUsuario,
        });
    };

    return Permissao;
};
