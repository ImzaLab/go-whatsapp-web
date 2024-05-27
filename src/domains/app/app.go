package app

import (
	"context"
	"time"
)

type IAppService interface {
	Login(ctx context.Context) (response LoginResponse, err error)
	Logout(ctx context.Context) (err error)
	Reconnect(ctx context.Context) (err error)
	FirstDevice(ctx context.Context) (response DevicesResponse, err error)
	FetchDevices(ctx context.Context) (response []DevicesResponse, err error)
	Pair(ctx context.Context, request PairRequest) (response PairResponse, err error)
}

type DevicesResponse struct {
	Name   string `json:"name"`
	Device string `json:"device"`
}

type LoginResponse struct {
	ImagePath string        `json:"image_path"`
	Duration  time.Duration `json:"duration"`
	Code      string        `json:"code"`
}

type PairRequest struct {
	Phone string `json:"phone" form:"phone"`
}

type PairResponse struct {
	LinkingCode string `json:"linking_code"`
}
