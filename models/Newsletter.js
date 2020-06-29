module.exports = (sequelize, DataTypes) => {
    const Newsletter = sequelize.define (
        "Newsletter", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nome: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "newsletters",
        }
    );

    Newsletter.associate = (models) => {

    };

    return Newsletter;
};
