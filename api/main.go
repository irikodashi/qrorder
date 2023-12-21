package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
	"log"
)

/*************************
GORMで登録テストしたいだけであり
画面のロジックではない
*************************/

// SHOPSテーブルのモデル
type Shop struct {
    ShopID    string    `gorm:"primaryKey;size:16"`
    ShopName  string    `gorm:"size:255;not null"`
    CreatedAt time.Time
}

// SHOP_AUTHテーブルのモデル
type ShopAuth struct {
    ShopID   string `gorm:"primaryKey;size:16"`
    LoginID  string `gorm:"size:255"`
    Password string `gorm:"size:255"`
}

func main() {

	// まずいけどただ単に登録テストしたいだけなので直書き。終わったらIDもパスも全て変える
	dsn := "user1:password@tcp(dbserver:3306)/qrsystem?charset=utf8mb4&parseTime=True&loc=Local"

	// データベースに接続
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("データベースへの接続に失敗しました: %v", err)
	}

	// テーブルの自動作成
	err = db.AutoMigrate(&Shop{}, &ShopAuth{})
	if err != nil {
		log.Fatalf("テーブルの自動作成に失敗しました: %v", err)
	}

	// データベース操作
	newShop := Shop{ShopID: "123", ShopName: "My Shop", CreatedAt: time.Now()}
	db.Create(&newShop)
}
