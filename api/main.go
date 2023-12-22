package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Shop struct {
	ShopID    string `gorm:"primaryKey;size:16"`
	ShopName  string `gorm:"size:255;not null"`
	CreatedAt time.Time
}

type ShopAuth struct {
	ShopID    string `gorm:"primaryKey;size:16"`
	Password  string `gorm:"size:255"`
	CreatedAt time.Time
}

// ユーザー登録リクエストのための構造体
type RegisterRequest struct {
	UserID   string `json:"userid"`
	Password string `json:"password"`
}

func main() {
	dsn := "user1:password@tcp(dbserver:3306)/qrsystem?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("データベースへの接続に失敗しました: %v", err)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowWildcard:    true,
	}))

	// ユーザー登録エンドポイント
	r.POST("/register", func(c *gin.Context) {

		var req RegisterRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// ShopAuthにユーザー情報を保存
		newShopAuth := ShopAuth{ShopID: req.UserID, Password: req.Password}
		if result := db.Create(&newShopAuth); result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "データベースエラー"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "登録成功"})
	})

	r.Run(":8080")
}
