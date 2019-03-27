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
    companyName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    bgImgUri: {
      type: DataTypes.STRING,
    },
    thumbnailUri: {
      type: DataTypes.STRING,
    },
    headerPhotoUri: {
      type: DataTypes.STRING,
    },
    sidebarPhotoUri: {
      type: DataTypes.STRING,
    },
    faviconPhotoUri: {
      type: DataTypes.STRING,
    },
    backgroundHexCode: {
      type: DataTypes.STRING,
      defaultValue: '#ffffff',
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
    sslActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    customNavbarLinks: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    tags: {
      type: DataTypes.JSONB,
    },
  })

  Blog.associate = function buildBlog(models) {
    Blog.hasOne(models.ProdInstance)
    Blog.hasMany(models.BlogPost, { as: 'blogPosts', foreignKey: 'blogId' })
  }

  return Blog
}
