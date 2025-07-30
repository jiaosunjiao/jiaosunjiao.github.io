# Website Maintenance Guide

## 🎯 **Easy Content Management System**

This website now uses a data-driven system that makes it easy to update content without touching any code! Here's how to manage your website:

## 📁 **File Structure for Easy Updates**

### **1. Adding New Kittens**
To add new kittens, simply:

1. **Add photos** to the appropriate folder:
   - `litters/current_litter/` - for upcoming litters
   - `litters/previous_litter/[litter-name]/` - for completed litters

2. **Update `data/kittens.json`** with the new information:

```json
{
  "current_litters": [
    {
      "id": "new-litter-id",
      "title": "Litter [Mom] and [Dad], due [Date]",
      "status": "accepting_reservations",
      "parents": {
        "mom": {
          "name": "Mom's Name",
          "image": "litters/current_litter/mom-photo.jpg",
          "description": "Description of mom"
        },
        "dad": {
          "name": "Dad's Name", 
          "image": "litters/current_litter/dad-photo.jpg",
          "description": "Description of dad"
        }
      },
      "kittens": [
        {
          "name": "Kitten Name",
          "image": "litters/current_litter/kitten1.jpg",
          "description": "Description of kitten"
        }
      ]
    }
  ]
}
```

### **2. Updating Cat Information**
To update information about your cats:

1. **Add new photos** to the `images/` folder
2. **Update `data/cats.json`**:

```json
{
  "featured_cats": [
    {
      "name": "Cat Name",
      "image": "images/cat-photo.jpg",
      "description": "Description of the cat",
      "awards": ["Award 1", "Award 2"],
      "status": "active_queen"
    }
  ],
  "slideshow_images": [
    {
      "image": "images/slide1.jpg",
      "alt": "Alt text for image",
      "description": "Description for slideshow"
    }
  ]
}
```

### **3. Updating Website Content**
To update text content throughout the website:

**Edit `data/content.json`** to change:
- Homepage hero text
- About page content
- FAQ questions and answers
- Contact page information
- Statistics and numbers

## 🚀 **Quick Update Examples**

### **Adding a New Litter**
1. Create folder: `litters/current_litter/new-litter/`
2. Add photos: `mom.jpg`, `dad.jpg`, `kitten1.jpg`, `kitten2.jpg`
3. Update `data/kittens.json` with new litter info
4. Website automatically updates!

### **Updating Cat Photos**
1. Replace photo in `images/` folder (keep same filename)
2. Or add new photo and update `data/cats.json` with new filename
3. Website automatically updates!

### **Changing Website Text**
1. Open `data/content.json`
2. Find the section you want to change
3. Edit the text
4. Save the file
5. Website automatically updates!

## 📋 **Available Status Options**

For litters, you can use these status values:
- `"accepting_reservations"` - Shows "Accepting Reservations!" badge
- `"coming_soon"` - Shows "Coming Soon" badge  
- `"completed"` - No badge, moves to previous litters
- `"available"` - Shows "Available Now" badge

## 🎨 **Image Guidelines**

- **Recommended size**: 800x600 pixels or larger
- **Format**: JPG, PNG, or HEIC
- **File names**: Use descriptive names (e.g., `chica-best-tonkinese.jpg`)
- **Folder structure**: Keep organized by litter/date

## 🔧 **Troubleshooting**

### **Images not showing?**
- Check file paths in JSON files
- Ensure images are in the correct folders
- Verify file names match exactly

### **Content not updating?**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check JSON syntax for errors
- Verify file is saved properly

### **Need to add new sections?**
- Contact your web developer to add new data structures
- Or follow the existing patterns in the JSON files

## 💡 **Pro Tips**

1. **Backup your data**: Keep copies of your JSON files
2. **Test changes**: Preview changes before going live
3. **Organize photos**: Use consistent naming conventions
4. **Regular updates**: Keep content fresh and current

## 📞 **Need Help?**

If you need to add new features or sections to the website, contact your web developer. The current system handles:
- ✅ Adding new kittens and litters
- ✅ Updating cat photos and information  
- ✅ Changing website text content
- ✅ Managing FAQ questions
- ✅ Updating contact information

This system makes your website maintenance much easier - no coding required! 🎉 