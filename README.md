### Server lấy api của mangadex api
Mangadex api cung cấp nhiều route api khác nhau nên phải chia thành các route để Front-end lấy được một số thứ cần thiết.

```C
api/mangadex/home
```
Đường dẫn để lấy các manga cập nhật gần đây nhất là chính, còn lại có slider một số manga nổi bật gần đây.

```C
api/mangadex/search
```
Hiển thị manga thông qua title tìm kiếm

```C
api/mangadex/manga/:id
```
Lấy info của manga hiện tại

```C
api/mangadex/mangaChapter/:id
```
Lấy list chapter của manga, limit mặc định là 50 để dễ load

```C
api/mangadex/cover/:id
```
Hiển thị ảnh bìa của một manga

```C
api/mangadex/chapterAll/:id
```
Lấy một số chapter mới nhất để hiển thị cùng ở trang home

```C
api/mangadex/chapterAll/:id
```
Lấy tất cả chapter của manga, chỉ lấy để dùng trong select chuyển hướng chapter kế hay chapter trước

```C
api/mangadex/image/:id
```
Lấy tất cả link ảnh từ chapter, dùng data-saver nên nó sẽ nhẹ hơn so với dùng data
