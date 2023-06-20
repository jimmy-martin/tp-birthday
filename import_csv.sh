#!/bin/bash

echo "Qu'est-ce que vous voulez importer ?"
echo "1. Utilisateurs"
echo "2. Citations"
echo "3. Les deux"

read choix

case $choix in
  1)
    node scripts/import_users.js
    ;;
  2)
    node scripts/import_quotes.js
    ;;
  3)
    node scripts/import_all.js
    ;;
  *)
    echo "Choix non reconnu."
    exit 1
    ;;
esac
