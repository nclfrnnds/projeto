module.exports = (sequelize, DataTypes) => {
    const Classificacao = sequelize.define (
        "Classificacao", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "classificacoes",
            //freezeTableName: true,
        }
    );

    Classificacao.associate = (models) => {

    };

    return Classificacao;
};
