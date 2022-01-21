using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoldersController : Controller
{
    [HttpGet]
    public ActionResult GetFolders(string path)
    {
        var folders = new List<Folder>();

        if (path == null)
        {
            foreach (var d in DriveInfo.GetDrives())
                folders.Add(new Folder(d.Name, d.Name));
        }
        else if (Directory.Exists(path))
        {
            foreach (var f in new DirectoryInfo(path).GetDirectories().Where(f => !f.Attributes.HasFlag(FileAttributes.Hidden)))
                folders.Add(new Folder(f.Name, f.FullName));
        }

        return Ok(folders);
    }
}