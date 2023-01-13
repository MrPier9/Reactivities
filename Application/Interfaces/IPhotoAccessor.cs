using Application.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}