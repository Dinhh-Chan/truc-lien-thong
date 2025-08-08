#!/bin/bash

echo "Khởi tạo MongoDB Replica Set..."

# Đợi MongoDB khởi động
echo "Đợi MongoDB khởi động..."
sleep 10

# Khởi tạo replica set
echo "Khởi tạo replica set..."
docker exec mongodb mongosh --eval "
rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'localhost:27017' }
  ]
})
"

# Đợi replica set khởi tạo
echo "Đợi replica set khởi tạo..."
sleep 5

# Kiểm tra trạng thái replica set
echo "Kiểm tra trạng thái replica set..."
docker exec mongodb mongosh --eval "rs.status()"

echo "MongoDB đã được khởi tạo thành công!" 