import zipfile
import os
import sys

def package_skill(source_dir, output_file):
    if not os.path.exists(os.path.dirname(output_file)):
        os.makedirs(os.path.dirname(output_file))
    
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # 아카이브 내에서의 상대 경로 계산
                arcname = os.path.relpath(file_path, source_dir)
                zipf.write(file_path, arcname)
    
    print(f"✅ Success: Skill packaged to {output_file}")

if __name__ == "__main__":
    src = sys.argv[1]
    out = sys.argv[2]
    package_skill(src, out)
