module.exports = function defineBlog(sequelize, DataTypes) {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    siteUrl: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    logoUri: {
      type: DataTypes.STRING,
    },
    backgroundHexCode: {
      type: DataTypes.STRING,
    },
    mainSiteUrl: {
      type: DataTypes.STRING,
    },
    twitterUrl: {
      type: DataTypes.STRING,
    },
    facebookUrl: {
      type: DataTypes.STRING,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.JSONB,
    },
  })

  Blog.associate = function buildBlog(models) {
    Blog.hasOne(models.ProdInstance)
  }

  return Blog
}
