#!/bin/bash

set -e  # Exit on error

POSTS_DIR="content/posts"

# Check if posts directory exists
if [[ ! -d "$POSTS_DIR" ]]; then
    echo "Error: Directory $POSTS_DIR does not exist"
    exit 1
fi

# Find the highest post number
find_highest_number() {
    local highest=0
    # Process each .md file
    for file in "$POSTS_DIR"/*.md; do
        if [[ -f "$file" ]]; then
            # Extract number from filename using basename and regex
            local filename=$(basename "$file" .md)
            if [[ $filename =~ ^[0-9]+$ ]]; then
                if [[ $filename -gt $highest ]]; then
                    highest=$filename
                fi
            fi
        fi
    done
    echo $highest
}

# Function to create multiple posts
create_multiple_posts() {
    local count=$1
    local start_post=$2
    
    for ((i=0; i<count; i++)); do
        local post_num=$((start_post + i))
        hugo new content "posts/${post_num}.md"
        echo "✓ Created posts/${post_num}.md"
    done
}

# Main execution
LAST_POST=$(find_highest_number)
NEXT_POST=$((LAST_POST + 1))

# Get number of posts to create (default: 1)
COUNT=${1:-1}

echo "Last post number: $LAST_POST"
echo "Creating $COUNT new posts starting from: $NEXT_POST"

create_multiple_posts $COUNT $NEXT_POST

echo "✓ Successfully created $COUNT posts (${NEXT_POST} to $((NEXT_POST + COUNT - 1)))"